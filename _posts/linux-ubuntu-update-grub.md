title: ��װUbuntu���Ҳ���windows sudo update-grub
tags: [linux,grub]
categories: linux
date: 2013-01-05 18:09:17
---
���Ѿ���Ubuntu 9.10��ͨ���ն�sudo update-grub�����ˣ��������һ����������XP��Windows 7����������һλ���ĵ����ѵ����İ����£����������������飬������֮��Ч�Ľ��������

ԭ���ǲ�����Ӳ�̰�װ��ʽ��װUbuntu�󣬰��Ǹ���������grldr�ƻ���

�޸�Ubuntu 9.10���/boot/grub/grub.cfg�ļ���Windows 7������ѡ�����ֱ�Ӹ��������������Windows 7ѡ��ɡ�

menuentry "Windows 7" { 
insmod ntfs 
set root=(hd0,1) 
drivemap -s (hd0) ${root}

chainloader +1 
}

���Ӧ�þͿ��Խ���grub4dos �Ĳ˵���Ȼ�� C ����GRUB��DOS״̬ ����grub>��ʾ�����������������������޸���������grldr����

grub>root (hd0,0) 
grub>chainloader /bootmgr 
grub>boot

����Windows 7��Ҫ���¼���Windows 7��Ȼ�����ʽ�ָ���Ubuntu 9.10��Windows 7��˫ϵͳ�����˵��ˣ�����XP����Windows 7�������˵���ģ�һ�������ˡ�������
