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

    // 6. 注册成功提示（后续可替换为跳转到登录页）
    alert('注册成功！');
    // window.location.href = 'login.html'; // 等登录页完成后再取消注释
}