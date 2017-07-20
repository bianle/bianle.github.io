---
title: "sonar"
date: 2017-07-14 17:29:48
tags: sonar
categories: sonar
---

## "InterruptedException" should not be ignored
squid:S2142 
InterruptedExceptions should never be ignored in the code, and simply logging the exception counts in this case as "ignoring". Instead, InterruptedExceptions should either be rethrown - immediately or after cleaning up the method's state - or the method should be reinterrupted. Any other course of action risks delaying thread shutdown and loses the information that the thread was interrupted - probably without finishing its task.

Noncompliant Code Example
```
public void run () {
  try {
    while (true) {
      // do stuff
    }
  }catch (InterruptedException e) { // Noncompliant; logging is not enough
    LOGGER.log(Level.WARN, "Interrupted!", e);
  }
}
```
Compliant Solution
```
public void run () throws InterruptedException{
  try {
    while (true) {
      // do stuff
    }
  }catch (InterruptedException e) {
    LOGGER.log(Level.WARN, "Interrupted!", e);
    // clean up state...
    throw e;
  }
}
```
or
```
public void run () {
  try {
    while (true) {
      // do stuff
    }
  }catch (InterruptedException e) {
    LOGGER.log(Level.WARN, "Interrupted!", e);
    // clean up state...
    Thread.currentThread().interrupt();
  }
}
```
See
- [MITRE, CWE-391](http://cwe.mitre.org/data/definitions/391.html) - Unchecked Error Condition
