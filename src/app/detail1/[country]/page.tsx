"use client"
import CountryInfo from "@/app/components/CountryInfo";
import LeftSidebar from "../../components/LeftSidebar";
import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";
import DisastersFilter from "@/app/components/DisastersFilter";
const Nation = () => {
  return (
      <>
      <NextUIProvider>
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container flex-1">
            <div className="flex w-full flex-col mx-auto p-2 max-w-7xl">
              <Tabs aria-label="Options" className="w-full ">
                <Tab key="nation" title="Nation">
                  <Card className="bg-dark-2 p-3">
                    <CardBody>
                    <CountryInfo />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="disaster" title="Disaster">
                  <Card className="bg-dark-2">
                    <CardBody>
                      <DisastersFilter />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </section>
        </main>
      </NextUIProvider>
    </>
  );
};
export default Nation;





