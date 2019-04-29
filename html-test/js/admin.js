
// 发送 get 请求
function get(url) {
    return $.get(url)
}

// 发送 post 请求
function post(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

// 获取 url 参数
function getUrlParams() {
    let paramStr = location.href.split('?')[1] || ''
    paramStr = paramStr.split('#')[0]
    const result = {}
    paramStr.split('&').forEach(itemStr => {
        const arr = itemStr.split('=')
        const key = arr[0]
        const val = arr[1]
        result[key] = val
    })
    return result
}

// 获取 dom 元素
const $textKeyword = $('#text-keyword')
const $btnSearch = $('#btn-search')
const $tableContainer = $('#table-container')

// 拼接接口 url
let url = '/api/blog/list?isadmin=1'  // 增加一个 isadmin=1 参数，使用登录者的用户名，后端也需要修改 ！！！
const urlParams = getUrlParams()
if (urlParams.keyword) {
    url += '&keyword=' + urlParams.keyword
}

// 加载数据
get(url).then(res => {
    if (res.errno !== 0) {
        alert('数据错误')
        return
    }

    // 显示数据
    const data = res.data || []
    data.forEach(item => {
        $tableContainer.append($(`
            <tr>
                <td>
                    <a href="/detail.html?id=${item.id}" target="_blank">${item.title}</a>
                </td>
                <td>
                    <a href="/edit.html?id=${item.id}">编辑</a>
                </td>
                <td>
                    <a data-id="${item.id}" class="item-del">删除</a>
                </td>
            </tr>
        `))
    })
})

// 搜索
$btnSearch.click(() => {
    const keyword = $textKeyword.val()
    location.href = '/admin.html?keyword=' + keyword
})

// 删除
$tableContainer.click(e => {
    const $target = $(e.target)
    if ($target.hasClass('item-del') === false) {
        return
    }

    if (confirm('确定删除？')) {
        const url = '/api/blog/del?id=' + $target.attr('data-id')
        post(url).then(res => {
            if (res.errno !== 0) {
                alert('操作错误')
                return
            }
            location.href = location.href
        })
    }
})