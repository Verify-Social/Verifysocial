import { getVendorAndOrder, getVendorReviews } from "@/actions/vendor";
import ReviewCard from "@/components/reveiw-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VendorAvatar from "@/components/vendor-avatar";
import VendorSearchInput from "@/components/vendor-search-input";
import { getCurrentUserDetails } from "@/data/user";
import RateVendor from "@/screens/rating-modal";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import OrderForm from "./order-form";

const VendorId = async ({
  params,
  searchParams,
}: {
  params: { vendorId: string };
  searchParams: { vendorcode?: string };
}) => {
  const { user } = await getCurrentUserDetails();
  const { vendor, order } = await getVendorAndOrder(
    params.vendorId,
    searchParams
  );
  const reviews = await getVendorReviews(params.vendorId);
  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-4xl font-bold">Vendors</h1>
          <Link href="/reviews">
            <Button className="text-xl font-semibold md:px-8 md:py-6 rounded-xl">
              View All Review
            </Button>
          </Link>
        </div>
        <div className="relative">
          <Search className="absolute w-6 h-6 top-1/2 left-2 -translate-y-3" />
          {/* <Input placeholder="Search by name" className="pl-10" /> */}
          <VendorSearchInput className="pl-10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="col-span-2 xl:col-span-1">
          <CardContent className="p-4">
            <div className="space-y-6">
              <div className="flex justify-between">
                <VendorAvatar vendor={vendor} />
                {order && (
                  <div>
                    <RateVendor order={order} />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vendor.Product.map((product) => (
                  <div key={product.id}>
                    <Image
                      src={product.image}
                      alt=""
                      width={400}
                      height={400}
                      className="rounded-xl object-cover w-full h-full aspect-video"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 xl:col-span-1">
          <CardContent className="p-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="font-semibold text-3xl">
                  Will you like to patronize this vendor?
                </h1>
                <p className="text-base">
                  Click on any of the social media platform to contact Glow by
                  Banks
                </p>
              </div>
              <div className="flex gap-6 items-center">
                {vendor.socialAccount.map((socialAccount) => {
                  switch (socialAccount.provider) {
                    case "INSTAGRAM":
                      return (
                        <Link
                          href={`https://instagram.com/${socialAccount.username}`}
                          target="_blank"
                          key={socialAccount.provider}
                        >
                          <BsInstagram className="h-10 w-10" />
                        </Link>
                      );

                    case "FACEBOOK":
                      return (
                        <Link
                          href={"https://facebook.com"}
                          target="_blank"
                          key={socialAccount.provider}
                        >
                          <FaFacebookSquare className="h-10 w-10 fill-blue-800" />
                        </Link>
                      );
                    case "TWITTER":
                      return (
                        <Link
                          href={"https://twitter.com"}
                          target="_blank"
                          key={socialAccount.provider}
                        >
                          <FaFacebookSquare className="h-10 w-10 fill-blue-800" />
                        </Link>
                      );
                  }
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="p-4">
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold">Reviews</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                {/* {Array.from({ length: 3 }, (_, index) => (
                  <ReviewCard key={index} />
                ))} */}
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {order && order.status === "PENDING" && !order.userId && (
        <OrderForm user={user} order={order} />
      )}
    </div>
  );
};

export default VendorId;
