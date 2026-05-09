import Head from "next/head";
import { Inter } from "next/font/google";
import { useState } from "react";
import TextInput from "@/components/TextInput";
import SubmitButton from "@/components/SubmitButton";
import ResponseDisplay from "@/components/ResponseDisplay";
import useApi from "@/hooks/useApi";
import { getUserPrompt } from "../prompts/promptUtils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { data, error, loading, fetchData } = useApi();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = getUserPrompt(inputValue);

    await fetchData("/api/openai", "POST", {
      content: prompt.content,
    });
  };

  return (
    <>
      <Head>
        <title>AI Car Buyer Assistant</title>
      </Head>

      <main className="container">
        <h1 className={inter.className}>AI Car Buyer Assistant</h1>

        <p>
          Describe your ideal car (budget, SUV/sedan, driving style, fuel preference, etc.)
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. AWD SUV under $25k for family use"
          />

          <SubmitButton onClick={handleSubmit} disabled={loading} />

          <ResponseDisplay data={data} error={error} loading={loading} />
        </form>
      </main>
    </>
  );
}