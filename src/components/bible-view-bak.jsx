import React from 'react'
import { BookPreview } from "@oce-editor-tools/base"
import { usfmText } from '../constants/John.usfm.js'
import { rangeArray, arrayToObject } from '../utils/obj-functions'
import { bRefLastVerseInChapter } from '@oce-editor-tools/verse-mapper'

const BibleView = ({curEp}) => {
  const renderFlags = {
    showTitles: true,
    showChapterLabels: true,
    showVersesLabels: true,
  };

  const getBcvFilter = (ep) => {
    // We must be able to iterate through several chapters 
    const begCh = ep?.begin?.ch
    const endCh = ep?.end?.ch
    const chObj = {}
    rangeArray(begCh,endCh).forEach((val) => {
      let curLastV = bRefLastVerseInChapter({bookId: 'John',chapter: val})
      if (val === endCh) curLastV = ep?.end?.v 
      let curBegV = 1
      if (val === begCh) curBegV = ep?.begin?.v
      const vArray = rangeArray(curBegV,curLastV).map((val) => {
        return { inx: val }
      })
      chObj[val] = { 
        v: arrayToObject(vArray,"inx")
      }
    })
    return {
      book: { 
        jhn: {
          ch: chObj
        } 
      } 
    }  
  }

  const isValidEp = !!curEp?.begin?.ch && !!curEp?.begin?.v && !!curEp?.end?.v 

  const previewProps = {
    usfmText,
    bcvFilter: isValidEp ? getBcvFilter(curEp) : undefined,
    verbose: true,
  }

  
  return (
      <div key="1">
        {isValidEp && <BookPreview {...previewProps} />}
      </div>
  );
}  

export default BibleView
