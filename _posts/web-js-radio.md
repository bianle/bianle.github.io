title: js取radio值
tags: [js]
categories: web前端
date: 2013-01-10 18:09:17
---
```
function ok()
{
  var temp=document.getElementsByName("radio");
  for (i=0;i<temp.length;i++){
  //遍历Radio
    if(temp[i].checked)
      {alert("你选择了"+temp[i].value);
      //获取Radio的值
      document.form2.textfield.value="你选择了"+temp[i].value;
      //传递给另外一个表单
      }
  }
}
```
