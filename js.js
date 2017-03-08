    // var inputArray = document.querySelectorAll('.form-input-text');
    // var hintArray = document.querySelectorAll('.form-input-hint');

    // // 获得焦点时显示提示
    // for (var i = 0; i < inputArray.length; i++) {
    //   (function (i) {
    //     var show = function () {
    //       showHint(hintArray[i]);
    //     }
    //     inputArray[i].addEventListener('focus', show, false);
    //   })(i);
    // }

    // for (var i = 0; i < inputArray.length; i++) {
    //   (function (i) {
    //     var check = function () {
    //       checkName()
    //     }
    //     inputArray[i].addEventListener('focusout', hide, false);
    //   })(i);
    // }


    function $(selector) {
      // 封装一下$选择器
      return document.querySelector(selector);
    }


    var userName = $('#username'),
      userNameHint = $('#name_hint'),
      password = $('#password'),
      passwordHint = $('#password_hint'),
      repassword = $('#repassword'),
      repasswordHint = $('#repassword_hint'),
      email = $('#email'),
      emailHint = $('#email_hint'),
      cellphone = $('#cellphone'),
      cellphoneHint = $('#cellphone_hint'),
      formReady;


      function checkform() {
        if (checkName() && checkPassword() && checkRePassword() && checkEmail() && checkCellphone()) {
          return true;
        } else {
          alert('输入有误！');
          return false;
        }
      }

    /**
     * 获得焦点后显示提示
     */
    userName.addEventListener('focus', function () {
      // 名称提示
      userNameHint.textContent = '必填，长度为4~16个字符';
      restoreStyle(userName, userNameHint);
      showHint(userNameHint);
    }, false);

    password.addEventListener('focus', function () {
      // 密码提示
      passwordHint.textContent = '必填，长度为6~14个字符，支持数字、大小写字母和下划线，不允许有空格。';
      restoreStyle(password, passwordHint);
      showHint(passwordHint);
    }, false);

    repassword.addEventListener('focus', function () {
      // 密码确认提示
      repasswordHint.textContent = '再次输入相同密码';
      restoreStyle(repassword, repasswordHint);
      showHint(repasswordHint);
    }, false);

    email.addEventListener('focus', function () {
      // 邮箱提示
      emailHint.textContent = '请输入您的邮箱地址';
      restoreStyle(email, emailHint);
      showHint(emailHint);
    }, false);

    cellphone.addEventListener('focus', function () {
      // 手机提示
      cellphoneHint.textContent = '请输入您的手机号码';
      restoreStyle(cellphone, cellphoneHint);
      showHint(cellphoneHint);
    }, false);



/**
 * 失去焦点后验证表单
 */
    userName.addEventListener('focusout', function () {
      // 验证名称
      checkName();
    }, false);

    password.addEventListener('focusout', function () {
      // 验证密码
      checkPassword();
    }, false);

    repassword.addEventListener('focusout', function () {
      // 验证密码确认
      checkRePassword();
    }, false);

    email.addEventListener('focusout', function () {
      // 验证邮箱
      checkEmail();
    }, false);

    cellphone.addEventListener('focusout', function () {
      // 验证手机
      checkCellphone();
    }, false);




/**
 * 更改样式的函数
 */
    // 显示提示信息
    function showHint(hint) {
      hint.classList.remove('hide');
    }

    // 隐藏提示信息
    function hideHint(hint) {
      hint.classList.add('hide');
    }

    // 恢复默认表单样式
    function restoreStyle(border, hint) {
      border.classList.remove('good-input-border');
      hint.classList.remove('good-input-hint');
      border.classList.remove('bad-input-border');
      hint.classList.remove('bad-input-hint');
    }

    // 添加验证失败的样式
    function addWrongStyle(border, hint) {
      border.classList.remove('good-input-border');
      border.classList.add('bad-input-border');

      hint.classList.remove('good-input-hint');
      hint.classList.add('bad-input-hint');
    }

    // 添加验证通过的样式
    function addGoodStyle(border, hint) {
      border.classList.remove('bad-input-border');
      border.classList.add('good-input-border');

      hint.classList.remove('bad-input-hint');
      hint.classList.add('good-input-hint');
    }



/**
 * 验证表单需要的函数
 */
    // 验证名称
    function checkName() {
      var str = userName.value;
      // 输入的内容是否在4到16个字符
      var strLength = str.replace(/[\u3000-\u9fff]/g, 'AB').length;
      if (strLength === 0) {
        addWrongStyle(userName, userNameHint);
        userNameHint.textContent = '名称不能为空';
        return false;
      } else if (strLength < 4 || strLength > 16) {
        addWrongStyle(userName, userNameHint);
        userNameHint.textContent = '名称长度应该为4-16个字符';
        return false;
      } else {
        addGoodStyle(userName, userNameHint);
        userNameHint.textContent = '名称格式正确';
        return true;
      }
    }

    // 验证密码
    function checkPassword() {
      var str = password.value;
      if (str.length === 0) {
        addWrongStyle(password,passwordHint);
        passwordHint.textContent = '密码不能为空';
        return false;
      } else if (/\W+/.test(str)) {
        addWrongStyle(password,passwordHint);
        passwordHint.textContent = '密码只支持使用数字、大小写字母和下划线';
        return false;
      } else if (str.length<6 || str.length >14) {
        addWrongStyle(password,passwordHint);
        passwordHint.textContent = '请将密码长度保持在6~14个字符';
        return false;
      } else {
        addGoodStyle(password, passwordHint);
        passwordHint.textContent = '密码可用';
        return true;
      }
    }

    // 验证密码确认
    function checkRePassword() {
      if(repassword.value.length === 0) {
        addWrongStyle(repassword,repasswordHint);
        repasswordHint.textContent = '密码不能为空';
        return false;
      }
      if(password.value === repassword.value) {
        addGoodStyle(repassword, repasswordHint);
        repasswordHint.textContent = '密码输入一致';
        return true;
      } else {
        addWrongStyle(repassword,repasswordHint);
        repasswordHint.textContent = '两次密码输入不一致';
        return false;
      }
    }

    // 验证邮箱
    function checkEmail() {
      var re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if (email.value.length === 0) {
        addWrongStyle(email,emailHint);
        emailHint.textContent = '请输入邮箱';
      }else if(re.test(email.value)) {
        addGoodStyle(email,emailHint);
        emailHint.textContent = '邮箱格式正确';
        return true;
      } else {
        addWrongStyle(email,emailHint);
        emailHint.textContent = '邮箱格式错误';
        return false;
      }
    }

    // 验证手机
    function checkCellphone() {
      var num = cellphone.value;
      if (num.length === 0) {
        addWrongStyle(cellphone,cellphoneHint);
        cellphoneHint.textContent = '请输入手机号码';
        return false;
      } else if(/\D+/.test(num)) {
        addWrongStyle(cellphone,cellphoneHint);
        cellphoneHint.textContent = '手机号码应该为数字';
        return false;
      } else if (num.length !== 11) {
        addWrongStyle(cellphone,cellphoneHint);
        cellphoneHint.textContent = '手机号码长度应该为11位';
        return false;
      } else {
        addGoodStyle(cellphone,cellphoneHint);
        cellphoneHint.textContent = '手机格式正确';
        return true;
      }
    }