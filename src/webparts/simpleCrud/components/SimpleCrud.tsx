import * as React from 'react';
// import styles from './SimpleCrud.module.scss';
import type { ISimpleCrudProps } from './ISimpleCrudProps';
import {SPFI} from "@pnp/sp";
import {IFAQ} from "../../../interfaces";
import {getSP} from "../../../pnpjsConfig";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import {useEffect} from "react";
// import { escape } from '@microsoft/sp-lodash-subset';

const Faq: React.FC<ISimpleCrudProps> = (props: ISimpleCrudProps) => {
  
  // const LOG_SOURCE: string = "SimpleCrudWebPart";
  const LIST_NAME: string = "FAQ";
  const _sp:SPFI = getSP(props.context)
  
  const [faqItems, setFAQItems] = React.useState<IFAQ[]>([]);
  const getFAQItems = async () => {
    console.log("getFAQItems", _sp)
    const items = await _sp.web.lists.getByTitle(LIST_NAME)
        .items.select()
        .orderBy("Letter")
        ();
    
    console.log('items', items)
    
    setFAQItems((await items).map((item: any) => {
        return {
            Id: item.Id,
            title: item.Title,
            body: item.Body,
            letter: item.Letter,
        }
    }))
  }

  useEffect(() => {
    getFAQItems()
  }, []);

  return (
      faqItems.map((o:IFAQ, index:number)=>{
          return (
              <>
                  {faqItems.map((o: IFAQ, index: number) => (
                      <div key={o.Id ?? index}>hello</div>
                  ))}
              </>
          )
      })
  )
}

export default Faq;