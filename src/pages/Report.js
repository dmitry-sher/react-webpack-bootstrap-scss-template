import React from "react";
import { MainLayout } from "../layouts/Main";
import { Facts } from "../components/catfacts/Facts";
import { Loader } from "../components/common/Loader";

export const ReportPage = () => (
  <MainLayout>
    <Loader
      url="https://cat-fact.herokuapp.com/facts"
      component={Facts}
    >
    </Loader>
  </MainLayout>
);

