---
layout: post
title: Go private modules in Gitlab
snippet: Why go get isn't working on a module that's under a private project in Gitlab?
language: english
published: true
---

At work I was trying to write a new service to be used accross a miriad of other
services in our infrastructure. It happens that, when we publish something in
Gitlab, specially if it's a private module and even more specially if that
module is under some group, `go get` can't find it.

Of course, setting up your go env variables such as GONOPROXY, GONOSUMDB,
GOPRIVATE and GOPROXY will be helpful it doesn't solve the issue. And yep, it
bugs my mind about this problem and it seems that we have quite a  long history
about it. The [issue](https://gitlab.com/gitlab-org/gitlab-foss/-/issues/37832)
that tracked  the problem is currently closed and it is 5 years old. Well,
someone on the from  the Gitlab organization created another
[issue](https://gitlab.com/gitlab-org/gitlab/-/issues/321864) to document the
available workarounds, though I'm only familiar with two. The first one is
simply to define your module with a `.git` suffix. For instance, the following
module will be found.

``` go
module gitlab.com/organization/group/module-name.git

go 1.19

require (
    "..."
)
```

The other one is to use an access token with the `api`, `read_repository`
scopes. That's quite simple but I personally don't think it's a good solution
because if you are working with other people your package will still be
inaccessible unless they setup their own access token. I wrote this hoping it
will be helpful to someone and also to solidify this problem in my head.
