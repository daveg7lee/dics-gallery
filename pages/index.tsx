import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import Popup from "reactjs-popup";
import { Pagination, Navigation } from "swiper";
import { useEffect } from "react";
import Image from "next/image";

const GET_PHOTOS = gql`
  query Photos($cursor: String) {
    photos(cursor: $cursor) {
      success
      error
      photos {
        id
        files
        caption
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, fetchMore } = useQuery(GET_PHOTOS, {
    variables: { cursor: null },
  });

  const fetchMorePosts = () => {
    fetchMore({
      variables: {
        cursor: data?.photos.photos[data?.photos.photos.length - 1].id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          photos: {
            error: null,
            success: true,
            __typename: "PhotosOutput",
            photos: [...prev.photos.photos, ...fetchMoreResult.photos.photos],
          },
        });
      },
    });
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && loading === false) {
      fetchMorePosts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      {loading ? (
        <div className="w-full h-96 flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="masonry sm:masonry-sm md:masonry-md">
          {data?.photos.photos.map((photo: any) => (
            <Popup
              key={photo.id}
              trigger={
                <img
                  className="mb-4 rounded-lg break-inside"
                  src={photo.files[0]}
                  alt="dics image"
                />
              }
              modal
              nested
            >
              <div className="p-2">
                <Swiper
                  spaceBetween={15}
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  navigation
                  modules={[Pagination, Navigation]}
                  {...{ style: { borderRadius: 10 } }}
                >
                  {photo.files.map((file: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full flex items-center justify-center">
                        <Image
                          src={file}
                          alt="post image"
                          className="rounded-lg"
                          width={700}
                          height={700}
                          objectFit="cover"
                          quality={100}
                          blurDataURL={file.replace("public", "preview")}
                          placeholder="blur"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-semibold">
                    {photo.caption}
                  </span>
                  <i className="fa-solid fa-download" />
                </div>
              </div>
            </Popup>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
