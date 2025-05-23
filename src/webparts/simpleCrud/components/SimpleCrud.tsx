import * as React from 'react';
import type { ISimpleCrudProps } from './ISimpleCrudProps';
import { SPFI } from "@pnp/sp";
import { IFAQ } from "../../../interfaces";
import { getSP } from "../../../pnpjsConfig";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { useEffect } from "react";
import {DocumentCard, DocumentCardDetails, DocumentCardTitle} from "@fluentui/react";

const Faq: React.FC<ISimpleCrudProps> = (props: ISimpleCrudProps) => {
  const LIST_NAME: string = "FAQ";
  const _sp: SPFI = getSP(props.context);

  const [faqItems, setFAQItems] = React.useState<IFAQ[]>([]);

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
    getFAQItems();
  }, []);

  return (
    <>
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