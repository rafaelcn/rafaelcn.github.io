---
layout: post
title: PostgreSQL drivers and Golang
language: english
snippet: Connection pools implementations on Go PostgreSQL drivers are scarse, in this post I will talk about lib/pg, pgbouncer and pgx
---

# Introduction

A few weeks ago I was trying to implement a service that I had on Heroku to use
as few connections as possible to the database as they limit the number of
connections to 20 on a free dynamo. At that time I was using the _lib/pq_ driver
and it  doesn't implement any kind of connection pooling but that would not be a
problem as I would close every unused connection after use, so I thought. The
implementation of get a connection and do stuff with it is shown in following
code.

``` go
package database

import (
    ...
)

type Database struct {
	instance *sql.DB
}

func New() (*Database, error) {
	db, err := sql.Open("postgres", "...")
	if err != nil {
		return nil, err
	}

	return &Database{
		instance: db
	}, nil
}

func (d *Database) Query(query string, arguments []interface{}) {
    rows, err := d.instance.Query(query, arguments...)
    if err != nil {
    	fmt.Fprintf(os.Stderr, "failed to acquirer database connection, reason %v", err)
    }
    defer rows.Close()

    // do important things with the data...
}
```

The problem with this approach is that the connection with the database on the
heroku instance isn't closed as defined in the defer. I really don't know why
and I didn't checked with the support directly, although I had a written
question on [SO](https://stackoverflow.com/questions/60196656/closing-database-connections-on-heroku)
about it. I was mesmerized. Why it does work on the localhost but it doesn't on
a dyno  instance? But I was quite   excited to solve the problem and so I turned
myself to look after a solution.

# PGBouncer

A connection pooler was needed to control how many connections the driver uses
and I found an appealing solution. The name of the solution is *pgbouncer* and
it promise to be lightweight and augment database performance.

A tutorial on how to setup a pgbouncer environment can be seen
[here](https://www.pgbouncer.org/install.html) and any specific details about
its configuration can be found [here](https://www.pgbouncer.org/config.html).

The setup alone might be troublesome for some and that is why I think there's
a better option to go with. Apart from that, I used and tested it in my local
machine and everything was fine, although the connection pool was not clear
to the programmer's code it was doing just fine.

To use PGBouncer inside a Heroku app instance though you have to configure a
few things first and you can follow every instruction to reproduce this
environment on this [heroku support page](https://devcenter.heroku.com/articles/on-dyno-postgres-connection-pooling).

After I submitted the code to Heroku the application was running fine, until
I hit a rock again. I was stunned by it. The connection pool wasn't doing its
job, much less the connections were being closed after usage.

# The solution

So I looked for more on the web to see if I could find any better replacement,
and I did. After some time I found [pgx](https://github.com/jackc/pgx/) which
featured a connection pool. I was very happy at that point. The code written
with it was clear that the use of a connection pool was in place, just as the
code below shows it:

``` go
package main

import (
    ...

    "github.com/jackc/pgx/v4"
    "github.com/jackc/pgx/v4/pgxpool"
)

var (
    pool *pgxpool.Pool
)

func main() {
    pool, err = pgxpool.Connect(context.Background(), os.Getenv("DATABASE_URL"))
    if err != nil {
        fmt.Fprintf(os.Stderr, "failed to connect to the database, reason %v", err)
    }
    defer conn.Close(context.Background())

    // A query then could be used with an acquired connection
    conn, err := pool.Acquire(context.Background())
    if err != nil {
        fmt.Fprintf(os.Stderr, "failed to get a connection with the database, reason %v", err)
    } else {
        // release the connection to the pool after using it
        defer conn.Release()

        query := "SELECT SOLUTION FROM TB_GO_PGSQL_DRIVERS";
        arguments = []interface{}{...}

        results, err := conn.Query(context.Background(), query, arguments...)

        if err != nil {
            fmt.Fprintf(os.Stderr, "failed to execute query, reason %v", err)
        } else {
            // show the results boy, you got it.
        }
    }

}
```
As you can clearly see, a connection pool is initialized and any following
queries to the database can be done with little connections from that pool,
using the `Acquire` method.

The problem after that was not anymore. I could enjoy my application running
without problems, as long as people using the application weren't so many
to surpass the 20 connections limit.

# Conclusion

Although I think I don't, at the time of writing, understand how pgbouncer and
heroku works together and why the heck it didn't close connections after
specifically being told to do so I think that pgx was a much more elegant
solution to the problem.

In fact, the pgx driver has a substantial increase in performance than the
alternatives on some cases due to [specific things](https://github.com/jackc/pgx/blob/master/README.md)
(see the performance section) that I won't mention over here.

All in all the usage of pgx was quite clear to me, contrary to the usage of
pgbouncer and <insert any other pgsql driver here>. I could just use it without
having to worry about two different, or possible more, cogs working together.

So in the end I vote for *pgx*, for its clear and documented API, has nice
features such as database types and connection pool, amongst others.
