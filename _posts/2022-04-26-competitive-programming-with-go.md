---
layout: post
title: Competitive Programming with Go
language: english
snippet: If you are looking to improve your problem solving skills with Golang
---

# Introduction

If you are looking to improve your problem solving skills with Golang there's a
lot of websites such as codeforces, beecrowd or even google kickstart. But is
there any kind of template te be used with the Go programming language?

I'd say there isn't a standard, as is the case with other programming languages.
And I would go further to say that as Go lacks (a time of writing) a way to
use go 1.18+ (generics) in said websites it's a bit tedious work to implement
some common data structures available in other programming languages such as C++
and Java.

The other (minor) problem is input handling. Files sent to a website don't
handle input the same way you test your program in your computer. In order to
solve this problem one has to specify a reader to be used whenever an input is
to be read.

Some other Go templates address this issue a bit differently when reading arrays
like reading a string and then spliting it, converting it to whatever type the
problem needs and finally it tried to solve the problem. But I think the 
following example is much simpler.

# The template

The source code provided here is a simple template that can be used whenever
you are looking to solve a problem with Golang that accounts for speed when
printing data. A buffered output is the way to **go** as it will be much faster
than printing each answer individually.

``` go
package main

import (
	"bufio"
	"os"
)

var (
	r = bufio.NewReader(os.Stdin)
	w = bufio.NewWriter(os.Stdout)
)

func main() {

    // code ...

	w.Flush()
}

func I(format string, a ...interface{}) {
	fmt.Fscanf(r, format, a...)
}

func O(format string, a ...interface{}) {
	fmt.Fprintf(w, format, a...)
}

// for debug purposes
var (
	localHostname = "<your computer hostname>"
	juryHostname, _ = os.Hostname()
)

func D(args ...interface{}) {
	if localHostname == juryHostname {
		fmt.Fprintln(os.Stderr, args...)
	}
}
```

# Example

Considering the boilerplate above, the following code will read a input of this
<a href="https://codeforces.com/contest/1646/problem/B)">problem</a>.

```go
func solve() {
    var n int

	I("%d\n", &n)

	a := make([]int, n)

	for i := 0; i < n; i++ {
		I("%d", &a[i])
	}
	I("\n")

    // solve the problem ...
}

func main() {
    var t int

	I("%d\n", &t)

	for t > 0 {
		solve()
		t--
	}

	writer.Flush()
}
```

At the end of the day you gonna get your input read correctly and whenever you
want to write something the output it will be flushed before the end of the
program.

Be careful with one thing though, don't over use debug statements. It might have
some impact on the jury's performance when evaluating your solution. I didn't
make a bench test to assess that but I plan to do it on the future post, along
with some solutions using the template.
