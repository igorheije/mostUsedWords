import { ipcMain } from 'electron'

const pathsToRows = require('./pathsToRows')
const prepareData = require('./prepareData')
const groupWords = require('./groupWords')

ipcMain.on('process-subtitles', (event,paths)=>{

    pathsToRows(paths)
        .then(rows => prepareData(rows))
        .then(word=> groupWords(word))
        .then(groupedWords=>event.reply('process-subtitles',groupedWords)
    )

})