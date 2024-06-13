import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';

interface ListingOweCardProps {
  owe: {
    _id: string;
    category: string;
    amount: number;
    title: string;
    description?: string;
    paid: boolean;
    debtor: string;
    creditorInfo?: {
      email: string;
      fullName: string;
      username: string;
      avatar: string;
    };
  };
  payOwe: (oweId: string) => void;
  isLoading: boolean;
}

export const ListingOweCard: React.FC<ListingOweCardProps> = ({ owe, payOwe, isLoading }) => {
  return (
    <Card className="w-[90%] my-4 p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className='flex mb-2 items-center justify-around'>
        <Avatar>
          <Image 
            src={owe.creditorInfo?.avatar || 'https://res.cloudinary.com/krishbackend/image/upload/v1712999375/kpvg81dod9pzjaxabbpe.png'} 
            alt={owe.creditorInfo?.username || 'User Avatar'} 
            width={50} 
            height={50} 
            className="rounded-full border-2 border-gray-300 dark:border-gray-600"
          />
          <AvatarFallback>
            {owe.creditorInfo?.username?.slice(0, 2) ||
              owe.creditorInfo?.fullName?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <CardHeader>
          <div className="flex-1 pr-4">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white truncate">{owe.title}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 truncate">{owe.description}</CardDescription>
          </div>
        </CardHeader>
      </div>
      <CardContent className="flex flex-col sm:flex-row sm:justify-between text-gray-600 dark:text-gray-300">
        <div className="flex flex-col sm:mr-4">
          <p className="text-lg font-semibold">Amount: <span className="text-blue-500 dark:text-blue-300">₹{owe.amount}</span></p>
          <p className="text-lg font-semibold">Category: <span className="text-blue-500 dark:text-blue-300">{owe.category}</span></p>
          <p className="text-lg font-semibold">Debtor: <span className="text-blue-500 dark:text-blue-300">{owe.creditorInfo?.username || owe.creditorInfo?.fullName}</span></p>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <Button 
            onClick={() => payOwe(owe._id)} 
            disabled={owe.paid || isLoading}
          >
            {isLoading ? (
              <div className='flex text-gray-600 items-center space-x-3'>
              <Loader2 className="h-5 w-5 animate-spin" />
                <span>Paying</span>
              </div>
            ): (owe.paid ? "Paid" : "Mark as Paid")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
