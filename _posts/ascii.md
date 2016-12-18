---
title: "ascii"
date: 2016-11-22 10:44:31
tags: ascii
categories: ascii
---

## “tree” command output with “pure” (7-bit) ASCII output

>I'm not sure about this but I think all you need is  
>													  
>tree | sed 's/├/\+/g; s/─/-/g; s/└/\\/g'		  
>For example:										  
>													  
>$ tree												  
>.													  
>├── file0										  
>└── foo											  
>    ├── bar										  
>    │   └── file2								  
>    └── file1									  
>													  
>2 directories, 3 files								  
>$ tree | sed 's/├/\+/g; s/─/-/g; s/└/\\/g'		  
>.													  
>+-- file0											  
>\-- foo											  
>    +-- bar										  
>    │   \-- file2									  
>    \-- file1										  
>													  
>2 directories, 3 files								  
>Alternatively, you can use the --charset option:	  
>													  
>$ tree --charset=ascii								  
>.													  
>|-- file0											  
>`-- foo											  
>    |-- bar										  
>    |   `-- file2									  
>    `-- file1										  
>													  
>2 directories, 3 files                               

http://unix.stackexchange.com/questions/127063/tree-command-output-with-pure-7-bit-ascii-output


