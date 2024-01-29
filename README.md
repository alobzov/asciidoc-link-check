# Asciidoc Link Checker

[![test](https://github.com/alobzov/asciidoc-link-checker/actions/workflows/test.yml/badge.svg)](https://github.com/alobzov/asciidoc-link-checker/actions/workflows/test.yml)
[![Hits-of-Code](https://hitsofcode.com/github/alobzov/asciidoc-link-checker?branch=main&label=Hits-of-Code)](https://hitsofcode.com/github/alobzov/asciidoc-link-checker/view?branch=main&label=Hits-of-Code)
[![My Telegram](https://img.shields.io/badge/Telegram-contact-active?logo=telegram)](https://t.me/alobzov)

This module extracts links from asciidoc texts and checks whether each link is alive ( 200 OK ) or dead.

## Installation through Yarn

To install the module simply run

```shell
yarn add asciidoc-link-checker@0.1.0
```

## Valid Links Example

Run

```shell
yarn asciidoc-link-checker ./test/data/valid-links-file.adoc
```

The exit code would be `0` and every link found is alive ( 200 OK ).

```shell
7:27   200 OK   http://docs.asciidoctor.org/asciidoc/latest/document-structure
7:96   200 OK   https://docs.asciidoctor.org/asciidoc/latest/document-structure
11:1   200 OK   http://docs.asciidoctor.org/asciidoc/latest/key-concepts
13:22   200 OK   https://docs.asciidoctor.org/asciidoc/latest/key-concepts
19:30   200 OK   http://docs.asciidoctor.org/asciidoc/latest/document-processing
19:124   200 OK   https://docs.asciidoctor.org/asciidoc/latest/document-processing
Exit code: 0
```

## Invalid Links Example

Run

```shell
yarn asciidoc-link-checker ./test/data/invalid-links-file.adoc
```

The exit code would be `-1` and every link found is not alive.

```shell
7:30   FAILED   http://docs.asciidocor.org/asciidoc/latest/document-structure
7:97   FAILED   https://docs.asciidocor.org/asciidoc/latest/document-structure
Exit code: -1
```

## Input File Validation

If the input file is undefined, the exit code would be `-2`.

If the input file is not adoc, the exit code would be `-3`.

If the input file is empty, the exit code would be `-4`.