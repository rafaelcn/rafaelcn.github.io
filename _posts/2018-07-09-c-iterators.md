---
layout: post
title: C Iterators
snippet: A little feature I've been experimenting with
language: english
published: true
---

<h2>Table of contents</h2>

* TOC
{: toc}

{: .gap}

## WTF are you implementing iterators in C? Is that even possible?

Calm down, everything is possible in C, just like shooting your foot using it.
But I'm here to report a little experiment I've been doing trying to minimize
the amount of work I have to do just to iterate a list or any list data
structure for that matter.

Iterators in C are quite easy to use and using it you feel aproximatelly the
same way if you were using Java or C++, just less safe, more error prone and
what not. I tried to minimize a lot of those problems though.

## Actual Implementation

An iterator encapsulates, in C++, a container. In the C implementation,
however, encapsulates a struct of a traversable list, in this case, a [single
linked list](https://en.wikipedia.org/wiki/Linked_list).

A single linked list is, simple put, a dynamically allocated list, which means
that it grows its size dynamically to allocate more elements. The iterator
encapsulates this structure which is, most of the time and for the sake of
simplicity composed by two fields that are shown bellow.

```
struct list_s {
    int value;
    struct list_s *next;
};
```

The value field is the field which actually holds the element and the next
pointer, well, it points to the next element on the list. Knowing the structure
of the `list_t` we can implement an iterator like that:

```
struct iterator_s {
    struct list_s *list;
}
```

Holding a list you can `create`, verify if it has `next`, `eval`uate and `free`
it. Implementations of this methods can be found on the repository
[c-iterators](https://github.com/rafaelcn/c-iterators). All of those operations
are safe to call and lead to writing software more legible as shown on the next
excerpt of code.

```
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

Until next time.

## References

1. [Single Linked List](https://en.wikipedia.org/wiki/Linked_list)
2. [C Iterators](https://github.com/rafaelcn/c-iterators)