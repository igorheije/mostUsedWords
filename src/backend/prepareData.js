module.exports = rows => {
    return new Promise((resolver, reject) => {
        try{
            const words = rows
                .filter(filterValidRow)
                .map(removePunctiatin)
                .map(removeTags)
                .reduce(margeRows)
                .split(' ')
                .map(word => word.toLowerCase())
                    
            
            resolver(words)
        }catch(e){
            reject(e)
        }
    })
}

function filterValidRow(row){
    const notNumber = !parseInt(row.trim())
    const notEmpty = !!row.trim()
    const notInterval = !row.includes('-->')
    return notNumber && notEmpty && notInterval
}

const removePunctiatin = row => row.replace(/[",?!.-]/g,'')
const removeTags = row => row.replace(/(<[^>]+)>/ig,'').trim()
const margeRows = (fullText, row)=> `${fullText} ${row}`