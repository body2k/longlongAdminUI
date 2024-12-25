export const userRole = {
    account: [
        {required: true, message: '请输入账号', trigger: 'blur'},
        {min: 6, message: '账号必须大于6位数', trigger: 'blur'}
    ],

    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, message: '账号必须大于6位数', trigger: 'blur'}
    ],
}
