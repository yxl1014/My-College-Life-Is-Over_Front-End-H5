// 使用上下文导入读取SVG文件列表
const context = import.meta.globEager('/src/assets/img/svg/*.svg')
// console.log("context--->",context)
// 获取文件名
const svgImageNames = Object.keys(context).map(key => {
    const fileName = key.replace(/^.*\/([^\/]+)\.svg$/, '$1'); // 提取文件名，去掉路径部分
    return fileName;
});
// console.log("svgImageNames--->",svgImageNames)
export default svgImageNames