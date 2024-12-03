import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Fab from '@mui/material/Fab'
import Home from '@mui/icons-material/Home'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { rangeArray, pad } from '../utils/obj-functions'
import { osisIconId, osisIconList } from '../constants/osisIconList'
import { getOsisChTitle, getChoiceTitle } from '../constants/osisChTitles'
import useBrowserData from '../hooks/useBrowserData'
import { 
  bibleDataEN, 
} from '../constants/bibleData'
import { naviSortOrder, chInBook,
          naviBooksLevel1, naviBooksLevel2, naviChapters } from '../constants/naviChapters'

const topObjList = {
  "en-audio-bible-WEB": {
    title: "Audio Bible",
    imgSrc: "/navIcons/40_Mt_08_12.png",
    subtitle: "with easy navigation"
  },
}
          
const useSerie = {
  "en-audio-bible-WEB": bibleDataEN,
}

const serieLang = {
  "en-audio-bible-WEB": "en",
}

const serieNaviType = {
  "en-audio-bible-WEB": "audioBible",
}

const SerieGridBar = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { classes, title, subtitle } = props
  return (
      <ImageListItemBar
        title={title}
        subtitle={subtitle}
      />
  )
}

const BibleView = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { size, width } = useBrowserData()
  const isPlaying = false
  const { t, i18n } = useTranslation()
  const useSerieId = "en-audio-bible-WEB" 
  const [curLevel, setCurLevel] = useState(1)
  const [level0, setLevel0] = useState(useSerieId)
  const [level1, setLevel1] = useState(1)
  const [level2, setLevel2] = useState("")
  const [level3, setLevel3] = useState("")
  const [picsSrc, setPicsSrc] = useState()
  const [skipLevelList,setSkipLevelList] = useState([])
  // ToDo !!! find a bibleBookList and use this here
  // eslint-disable-next-line no-unused-vars
  const preNav = "/navIcons/"
  const picsPreNav = "/img/free-pics/"
  const getSort = (val) => naviSortOrder.indexOf(parseInt(val))
  const addSkipLevel = (level) => setSkipLevelList([...skipLevelList,level])

  // eslint-disable-next-line no-unused-vars
  const getChFreePic = (bookObj,ch) => {
    const {level1,level2} = bookObj
    let checkIcon = "000-" + pad(level1)
    if (level2!=null) checkIcon = "00-" + pad(level1) + level2
    let imgSrc
    // Book Icon - To Do - to be added in the future
    // imgSrc = preBook +getOsisIcon(bk) +".png"
    // Replace this above with book icons !
    const lng = "en"
    const bk = (bookObj!=null)?bookObj.bk:null
    if (bk!=null){ // level 3
      const checkObj = osisIconList[bk]
      if (checkObj!=null){
        let useCh
        if (ch==null){
          const entry = Object.entries(checkObj)[0]
          useCh = entry[0]
          if (bk!=null){ // level 3
            const {beg,end} = bookObj
            if ((beg!=null)&&(end!=null)){
              useCh = Object.keys(checkObj).find(key => key>=beg)
            }
          }
        } else {
          if (checkObj[ch]!=null) useCh = ch
        }
        if (useCh!=null){
          const prefixIdStr = osisIconId[bk]
          const firstId = pad(parseInt(useCh))
          const firstEntry = checkObj[useCh][0]
          // checkIcon = osisIconId[bk] + "_" + firstId + "_" + firstEntry
          checkIcon = `${prefixIdStr.slice(0,2)}/610px/${osisIconId[bk]}_${firstId}_${firstEntry}_RG`
        }
      }
    }
    imgSrc = picsPreNav +checkIcon +".jpg"
    return {
      imgSrc,
      ch,
    }
  }

  // eslint-disable-next-line no-unused-vars
  const getChIcon = (key,lev1,lev2,bookObj,ch) => {
    let checkIcon = "000-" + pad(lev1)
    if (lev2!=null) checkIcon = "00-" + pad(lev1) + lev2
    let imgSrc
    let checkTitle
    const lng = serieLang[level0]
    const bk = (bookObj!=null)?bookObj.bk:null
    if (bk!=null){ // level 3
      const checkObj = osisIconList[bk]
      if (checkObj!=null){
        let useCh
        if (ch==null){
          const entry = Object.entries(checkObj)[0]
          useCh = entry[0]
          if (bk!=null){ // level 3
            const {beg,end} = bookObj
            if ((beg!=null)&&(end!=null)){
              useCh = Object.keys(checkObj).find(key => key>=beg)
            }
          }
        } else {
          if (checkObj[ch]!=null) useCh = ch
        }
        if (useCh!=null){
          const firstId = pad(parseInt(useCh))
          const firstEntry = checkObj[useCh][0]
          checkIcon = osisIconId[bk] + "_" + firstId + "_" + firstEntry
        }
      }
// Book Icon - To Do - to be added in the future
//    imgSrc = preBook +getOsisIcon(bk) +".png"
      checkTitle = t(bk, { lng })
    } else {
      checkTitle = t(checkIcon, { lng })
    }
    imgSrc = preNav +checkIcon +".png"
    let title = (ch!=null) ? getOsisChTitle(bk,ch,lng) : checkTitle
    let subtitle
    if (bk==null){ // level 1 and 2
      const checkStr = checkIcon + "-descr"
      subtitle = t(checkStr, { lng: serieLang[level0] })
      if (subtitle===checkStr) subtitle = ""
    } else if (ch==null){ // level 3
      const {beg,end} = bookObj
      if ((beg!=null)&&(end!=null)){
        subtitle = (beg===end) ? beg : beg + " - " + end
      }
      const choiceTitle = getChoiceTitle(bk,key+1,lng)
      if (choiceTitle!=null) {
        title += " " + subtitle
        subtitle = choiceTitle
      }
    }
    return {
      imgSrc,
      key,
      subtitle,
      title,
      isBookIcon: false
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleClick = (ev,id,_isBookIcon) => {
    if (curLevel===0) {
      console.log(id)
      setLevel0(id)
      setCurLevel(1)
    } else if (curLevel===1) {
      setLevel1(id)
      setCurLevel(2)
    } else if (curLevel===2) {
      setLevel2(id)
      if (naviChapters[level1][id].length===1){
        setLevel3(0)
        setCurLevel(4)
      } else setCurLevel(3)  
    } else if (curLevel===3) {
      setLevel3(id)
      setCurLevel(4)
    } else {
      const bookObj = {...naviChapters[level1][level2][level3], level1, level2, level3}
      const curPic = getChFreePic(bookObj,id)
      setPicsSrc(curPic) 
    }
  }

  const navigateUp = (level) => {
    if (picsSrc) {
      setPicsSrc(undefined)
    } else if (skipLevelList.includes(level)) {
      navigateUp(level-1)
    } else {
      setCurLevel(level)
      if (level===0) setLevel0("audioBible")
    }
  }

  const navigateHome = () => {
    setPicsSrc(undefined)
    setCurLevel(1)
    setLevel1(1)
  }

  const handleReturn = () => {
    if ((curLevel===4)&&(naviChapters[level1][level2].length===1)){
      navigateUp(2)
    } else
    if (curLevel>0){
      navigateUp(curLevel-1)
    } else {
      onExitNavigation()
    }
  }
    
  let validIconList = []
  let validBookList = []
  if (curLevel===0){
    validIconList = Object.keys(topObjList).filter(key => (key!=="en-jhn-plan")).map((key) => {
      return {
        ...topObjList[key],
        key
      }
    })
  } else if (curLevel===1){
    let lastInx
    const curSerie = useSerie[level0]
    const curList = (curSerie!=null && curSerie.bibleBookList) ? curSerie.bibleBookList : []
    Object.keys(naviBooksLevel1).sort((a,b)=>getSort(a)-getSort(b)
    ).forEach(iconInx => {
      const foundList = naviBooksLevel1[iconInx].filter(x => curList.includes(x))
      validBookList.push(...foundList)
      if (foundList.length>0){
        lastInx = iconInx
        validIconList.push(getChIcon(iconInx,iconInx))
      }
    })
    if (validIconList.length===1) {
      setLevel1(lastInx)
      setCurLevel(2)
      addSkipLevel(1)
      validIconList = []
      validBookList = []
    }
  }
  if (curLevel===2){
    let lastLetter
    const curSerie = useSerie[level0]
    const curList = (curSerie!=null) ? curSerie.bibleBookList : []
    Object.keys(naviChapters[level1]).forEach(iconLetter => {
      const foundList = naviBooksLevel2[level1][iconLetter].filter(x => curList.includes(x))
      validBookList.push(...foundList)
      if (foundList.length>0) {
        lastLetter = iconLetter
        validIconList.push(getChIcon(iconLetter,level1,iconLetter))
      }
    })
    if (validIconList.length===1) {
      setLevel2(lastLetter)
      setCurLevel(3)
      addSkipLevel(2)
      validIconList = []
      validBookList = []
    }
  }
  if (curLevel===3){
    naviChapters[level1][level2].forEach((bookObj,i) => {
      validIconList.push(getChIcon(i,level1,level2,bookObj))
    })
  } else if (curLevel===4){
    const bookObj = naviChapters[level1][level2][level3]
    const {bk} = bookObj
    if (bk!=null){
      if (bookObj.beg==null) bookObj.beg = 1
      if (bookObj.end==null) bookObj.end = chInBook[bk]
      const {beg,end} = bookObj
      rangeArray(beg,end).forEach(ch => {
        validIconList.push(getChIcon(ch,level1,level2,bookObj,ch))
//          validIconList.push(getChIcon(index here,level1,bookObj,ch,ch))
      })
    }
  }
  let useCols = 3
  if (size==="xs") useCols = 2
  else if (size==="lg") useCols = 4
  else if (size==="xl") useCols = 5
  const rootLevel = (curLevel===0)
  const naviType = serieNaviType[level0] || "audioBible"
  const lng = serieLang[level0]
  const hasPicsSrc = picsSrc
  return (
    <div>
      {(naviType==="audioBible") && (curLevel>2) && (
        <Fab
          onClick={navigateHome}
          // className={largeScreen ? classes.exitButtonLS : classes.exitButton}
          color="primary"
        >
          <Home/>
        </Fab>
      )}
      {(curLevel>1) && (naviType==="audioBible") && (
        <Fab
          onClick={handleReturn}
          // className={largeScreen ? classes.exitButtonLS : classes.exitButton}
          color="primary"
        >
          <ChevronLeft />
        </Fab>
      )}
      {hasPicsSrc && (
        <img
          src={picsSrc.imgSrc}
          alt={"test"}/>
      )}
      {!hasPicsSrc && (naviType==="audioBible") && (<ImageList
        rowHeight="auto"
        cols={useCols}
      >
        {validIconList.map(iconObj => {
          const {key,imgSrc,title,subtitle,isBookIcon} = iconObj
          return (
            <ImageListItem
              onClick={(ev) => handleClick(ev,key,isBookIcon)}
              key={key}
            >
              <img
                src={imgSrc}
                alt={title}/>
              <SerieGridBar
                title={title}
                subtitle={subtitle}
              />
            </ImageListItem>
          )
        })}
        </ImageList>
      )}
    </div>
  )
}

export default BibleView
