// 发送 get 请求
function get(url) {
    return $.get(url)
}

// 显示格式化的时间
function getFormatDate(dt) {
    return moment(dt).format('LL')
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
const $container = $('#blog-container')

// 拼接接口 url
let url = '/api/blog/list'
const urlParams = getUrlParams()
if (urlParams.author) {
    url += '?author=' + urlParams.author
}

// 加载数据
get(url).then((res) => {
    if (res.errno !== 0) {
        alert('数据错误')
        return
    }

    // 遍历博客列表，并显示
    const data = res.data || []
    data.forEach(item => {
        $container.append($(`
            <div class="title-wrapper">
                <p class="title">
                <a href="/detail.html?id=${item.id}" target="_blank">${item.title}</a>
                </p>
                <div class="info-wrapper">
                    <span>
                        <a href="/index.html?author=${item.author}">${item.author}</a>
                    </span>
                    <span>${getFormatDate(item.createtime)}</span>
                </div>
            </div>
        `))
        $('.blog_list').prepend($(`
            <div class="blog_item">
                <span class="blog_time">${getFormatDate(item.createtime)}</span>
                <a href="/detail.html?id=${item.id}" class="blog_content">
                    ${item.title}
                </a>
            </div>
        `
        ))
    })
})
// nav栏切换

$('.nav_mask').eq(0).show()
$('.nav_item').on('click', function() {
    $('.nav_item').find('.nav_mask').hide()
    $(this).find('.nav_mask').fadeIn(400)
})