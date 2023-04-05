---
layout: post
title: Protocol X
language: english
snippet: An unusual protocol 
---

# Introduction

In the process of a job interview I was asked to establish a connection with a
server, receive packets implemented in a protocol that they called the
_X Protocol_, decode it do some work with the packets received from the server,
encode it back on the same protocol and send the result back to the server.

It looks like a lot of things to do, right? I'll break down every piece of the
instructions as well as the implementation, done in Go. You can find all the
source code (https://github.com/rafaelcn/protocol-x)[here]. By the way, all the
sensitive information about the company's name and address used to communicate
with them will be either faked or replaced.

# The task

On the undisclosed paper it was listed 9 objectives, they are:

1. Establish a connection with the company's server
2. Receive packets coded using "X protocol"
3. Decode the received packets thus obtaining the original message
4. Change the spaces characters to underlines
5. Change the string to upper and lower characters
6. Invert the message
7. Re-encode the inverted message using the same "X Protocol"
8. Send the resulting data to the server
9. Receive confirmation message coded using "X Protocol"

Having all of those tasks in mind I began with the number one.

## Connecting and receiving

One of the first thoughts I had were how, am I going to use TCP or UDP? This was
an easy question to answer, I used TCP because I need the integrity of all the
packets sent to me by the server.

So I began to implement it in Go, the language provides awesome features to work
with network using the `net` package. So I wrote some simple boilerplate to
connect to some server.

``` go
package main

import (
    "log"
    "net"
)

var (
    ip   string = "assignment.company.com"
    port string = "53211"
)

func main() {
    connection, err := connect(ip, port)
    if err != nil {
        m := "something went wrong trying to connect to the host, reason %v"
        log.Fatalf(m, err.Error())
    }

    defer connection.Close()

    log.Printf("connected from %s", connection.LocalAddr())
    log.Println("reading content...")

    var buffer []byte = make([]byte, 0)

    for n, err := connection.Read(buffer); n >= 0 && err != io.EOF; {
        log.Printf("size: %d | content: %b\n", n, buffer)
        time.Sleep(1 * time.Second)

        if err != nil {
            const m = "error reading content from the address, reason %v"
            log.Fatalf(m, err.Error())
        }
    }
}

func connect(ip string, port string) (*net.TCPConn, error) {
    addr, err := net.ResolveTCPAddr("tcp", ip+":"+port)

    if err != nil {
        log.Fatal(err)
    }

    log.Printf("trying to connect to %s:%d", addr.IP, addr.Port)

    conn, err := net.DialTCP("tcp4", nil, addr)
    conn.SetKeepAlive(true)

    return conn, err
}
```

