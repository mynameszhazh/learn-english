import { describe, it, expect } from "vitest";
import { parse } from './parsePdfs'

describe('pds parse', () => {
  it('parse', () => {
    const text = `2 
  
      中文 英文 K.K.音标
      我 
      I /aɪ/ 
      喜欢 
      like /laɪk/`

    expect(parse(text)).toStrictEqual([
      {
        chinese: '我',
        english: "I",
        soundmark: '/aɪ/'
      },
      {
        chinese: '喜欢',
        english: "like",
        soundmark: '/laɪk/'
      },
    ])
  })
})