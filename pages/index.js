import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeroSection from "../components/HeroSection";
import { connect } from "./api/db";
import connectDB from "../lib/db";
import Layout from "../components/layout/Layout";

// // Call the connectDB function
// connectDB();
export default function Home({ data }) {
  return (
    <div>
      <Layout>
        <HeroSection />
        {/* other page sections */}
      </Layout>
    </div>
  );
}
