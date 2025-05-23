import * as React from 'react';
import type { ISimpleCrudProps } from './ISimpleCrudProps';
import { SPFI } from "@pnp/sp";
import { IFAQ } from "../../../interfaces";
import { getSP } from "../../../pnpjsConfig";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { useEffect } from "react";
import {DocumentCard, DocumentCardDetails, DocumentCardTitle, Dropdown, IDropdownOption} from "@fluentui/react";

const Faq: React.FC<ISimpleCrudProps> = (props: ISimpleCrudProps) => {
  const LIST_NAME: string = "FAQ";
  const _sp: SPFI = getSP(props.context);

  const [lists, setLists] = React.useState<IDropdownOption[]>([]);
  const [selectedList, setSelectedList] = React.useState<string | number | undefined>(undefined);
  const [faqItems, setFAQItems] = React.useState<IFAQ[]>([]);

  const getLists = async () => {
    try {
      // Re-initialize SP each time to ensure it's available
      const sp = getSP(props.context);

      const lists = await sp.web.lists.select('Id,Title').filter('Hidden eq false')();
      console.log(lists);
      setLists(lists.map((item: any) => ({
        key: item.Id,
        text: item.Title,
      })));
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }
  const getFAQItems = async () => {
    const items = await _sp.web.lists.getByTitle(LIST_NAME)
      .items.select()
      .orderBy("Letter")();
    // console.log(items);
    
    setFAQItems(items.map((item: any) => ({
      Id: item.Id,
      title: item.Title,
      body: item.Body,
      letter: item.Letter,
    })));
  };

  useEffect(() => {
    getLists(); 
    getFAQItems();  
  }, []);

  return (
    <>
      <div>
        <Dropdown label="Select a list" 
                  options={lists} selectedKey={selectedList} 
                  onChange={(_, option)=>setSelectedList(option?.key as string)}
                    placeholder="Select a list"
        ></Dropdown>
      </div>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <h2>Faq</h2>
          {faqItems.map((o: IFAQ, index: number) => (
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" key={o.Id ?? index}>
              <DocumentCard>
                <DocumentCardDetails>
                  <DocumentCardTitle title={`ID: ${o.Id}`} />
                  <DocumentCardTitle title={`Title: ${o.title}`} />
                  <DocumentCardTitle title={`Letter: ${o.letter}`} />
                </DocumentCardDetails>
              </DocumentCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faq;