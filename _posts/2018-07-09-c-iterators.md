---
layout: post
title: C Iterators
snippet: A little feature I've been experimenting with. It turns out it isn't that good.
language: english
published: true
---

I had post the discussion about C iterators on single linked lists on linkedin
to extend the discussion further. It had clarified the idea of using iterators
for this purpose and showed me a lot of flaws on my current implementation.
Nevertheless this project is interesting and teaches some encapsulation over
this structure, which could be extended to other structures as well.
The post on linkedin can be found
[here](https://www.linkedin.com/groups/1627067/1627067-6421946707277283332).
{: .notification .is-info .is-light}

# WTF are you implementing iterators in C? Is that even possible?

Calm down, everything is possible in C, just like shooting your foot using it.
But I'm here to report a little experiment I've been doing trying to minimize
the amount of work I have to do just to iterate a list or any list data
structure for that matter.

Iterators in C are quite easy to use and using it you feel aproximatelly the
same way if you were using Java or C++, just less safe, more error prone and
what not. I tried to minimize a lot of those problems though.

# Actual Implementation

An iterator encapsulates, in C++, a container. In the C implementation,
however, it encapsulates a struct of a traversable list, in this case, a [single
linked list](https://en.wikipedia.org/wiki/Linked_list).

A single linked list is, simple put, a dynamically allocated list, which means
that it grows its size dynamically to allocate more elements. The iterator
encapsulates this structure which is, most of the time and for the sake of
simplicity composed by two fields that are shown bellow.


``` c
struct list_s {
    int value;
    struct list_s *next;
};
```

The value field is the field which actually holds the element and the next
pointer, well, it points to the next element on the list. Knowing the structure
of the `list_t` we can implement an iterator like that:

``` c
struct iterator_s {
    struct list_s *list;
}
```

Holding a list you can `create`, verify if it has `next`, `eval`uate and `free`
it. Implementations of this methods can be found on the repository
[c-iterators](https://github.com/rafaelcn/c-iterators). All of those operations
are safe to call and lead to writing software more legible as shown on the next
excerpt of code.

``` c
list_t *list = ...;

iterator_t *it = ...;

while (iterator_next(it)) {
    printf("%d ", iterator_eval(it));
}

...
```

As it can be seen it is easy to iterate over a list without having to define
code to traverse the list on the list implementation, and doing that is good
because you separate responsability.

Those iterators could have more properties which help even more the act of
writing good software as **size**, the first pointer denoted as **begin** and
the last element denoted by a pointer with the name **end**. The final structure
would look like:

``` c
struct iterator_s {
    int value;
    size_t size;
    struct list_s *begin;
    struct list_t *end;
    struct list_t *list;
}
```

# References

1. [Single Linked List](https://en.wikipedia.org/wiki/Linked_list)
2. [C Iterators](https://github.com/rafaelcn/c-iterators)
