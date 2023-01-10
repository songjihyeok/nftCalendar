import type { AppProps } from "next/app";
import { Provider as ResponseProvider } from "@src/Components/Common/Provider/isMobile";
import "@src/styles/variables.less";
import { ThemeProvider } from "styled-components";
import { theme } from "@src/styles/theme";
import { ApolloProvider } from "@apollo/client";
import client from "@src/graphql/apollo";
import "filepond/dist/filepond.min.css";
import Layout from "@src/Components/Layout";
import { registerPlugin } from "react-filepond";
import Head from 'next/head';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import "@src/styles/root.scss";
import { useCallback, useEffect } from "react";
import AdminLayout from "@src/Components/AdminLayout";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileRename);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes('/admin') && !localStorage.getItem('nftDropsAuthorization'))
      router.push('/admin/login');
  }, []);

  const Page = useCallback(() => {
    if (router.pathname === '/admin/login') {
      return <Component {...pageProps} />;
    }

    if (router.pathname.includes('/admin')) {
      return (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      );
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }, [router]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={{ ...theme, mobileMedia: theme.mobile }}>
        <ResponseProvider>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Page />
        </ResponseProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp
