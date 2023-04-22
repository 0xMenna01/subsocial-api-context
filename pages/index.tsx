import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useApi } from "../src/contexts";

const Home: NextPage = () => {
  const subApi = useApi();
  // To get the Subsocial API instance use: subApi.api
  // To get the Substrate API instance use: subApi.substrateApi
  // Use it as you wish, check the Subsocial SDK documentation for more details at 
  // https://docs.subsocial.network/docs/develop

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Subsocial University</h1>

        <p className={styles.description}>
          Learn everything about Subsocial SDKs
        </p>
      </main>
    </div>
  );
};

export default Home;
