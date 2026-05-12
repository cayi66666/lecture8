// 注册函数
function signup() {
    // 1. 获取表单输入值
    let name = document.getElementById('signupName').value.trim();
    let email = document.getElementById('signupEmail').value.trim();
    let pwd = document.getElementById('signupPwd').value;
    let pwd2 = document.getElementById('signupPwd2').value;

    // 2. 基础校验
    if (!name || !email || !pwd || !pwd2) {
        alert('所有输入框都必须填写！');
        return;
    }
    if (pwd !== pwd2) {
        alert('两次密码输入不一致！');
        return;
    }

    // 3. 读取本地存储的用户列表（无数据则初始化空数组）
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // 4. 密码加密
    let salt = bcrypt.genSaltSync(10);
    let hashedPwd = bcrypt.hashSync(pwd, salt);

    // 5. 保存新用户信息
    let newUser = {
        name: name,
        email: email,
        password: hashedPwd
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // 6. 注册成功提示
    alert('注册成功！');
}

// 登录函数
function login() {
    // 1. 获取表单输入
    let email = document.getElementById('loginEmail').value.trim();
    let pwd = document.getElementById('loginPwd').value;

    // 2. 基础校验
    if (!email || !pwd) {
        alert('邮箱和密码不能为空！');
        return;
    }

    // 3. 读取本地用户列表
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // 查找是否存在该邮箱的用户
    let targetUser = users.find(user => user.email === email);

    if (!targetUser) {
        alert('该邮箱未注册，请先注册！');
        return;
    }

    // 4. 校验密码是否正确
    let isPwdValid = bcrypt.compareSync(pwd, targetUser.password);
    if (!isPwdValid) {
        alert('密码错误！');
        return;
    }

    // 5. 登录成功，保存当前用户信息（用于后续页面判断登录状态）
    localStorage.setItem('currentUser', JSON.stringify({
        name: targetUser.name,
        email: targetUser.email
    }));

    alert('登录成功！');
}