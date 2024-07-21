import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css"

import fetchImage from "../api/fetchImage";

type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl}) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    }

    return(
    <div className={styles.page}>
        <button onClick={handleClick} className={styles.button}>他のにゃんこも見る</button>
        <div className={styles.frame}>{loading || <img src={imageUrl} className={styles.img}/>}</div>
    </div>
    )
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        }
    }
}

export default IndexPage;