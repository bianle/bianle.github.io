title: Flex-代码格式化eclipse插件:Flex Formatter
tags:
categories: web前端
date: 2013-02-03 18:09:17
---

Flex Formatter is an extremely useful plugin for FlexBuilder / FlashBuilder that formats your ActionScript code (AS3) and MXML according to a broad range of settings, and helps you to generate ASDoc comments automatically. It is free, and open source.

It’s code formatting is quite robust and configurable, handling things like brace settings (cuddling versus next line), white space around parameters and operators, sorting imports, and a ton more. Thankfully, you can export your settings to a file and share it with your whole team. You can also have it automatically update settings from a file that you can share over the network or via SVN / GIT.

Unfortunately, it’s ASDoc features are much more rudimentary, and do not have any configuration options. They serve as an acceptable starting point, and save some time, but I would love to see some additional support here (for example, an option to mark private and or protected members as @private, which is a very common requirement).

Regrettably, Flex Formatter does not seem to come with installation instructions. If you are not familiar with installing Eclipse plugins, it can take a lot of work to figure it out, but it’s very simple if you know how to do it:

1. Start up FlexBuilder / FlashBuilder.
2. From the Help menu, select ‘Software Updates > Find and Install…’
3. Select ‘Search for new features to install’ and click ‘Next >’
4. Click ‘New Remote Site…’
5. Use name: ‘Flex Formatter’ and url: ‘http://flexformatter.googlecode.com/svn/trunk/FlexFormatter/FlexPrettyPrintCommandUpdateSite/’
6. Click OK
7. Make sure only ‘Flex Formatter’ is selected in the ‘Sites to search’ list, and click ‘Finish’
8. Follow the prompts to install Flex Formatter, and restart the IDE

Once you’ve restarted, you should see the Flex Formatter bar with buttons to ASDoc, format, and rearrange your code. You should also have a ‘Flex Formatting’ entry in preferences.
