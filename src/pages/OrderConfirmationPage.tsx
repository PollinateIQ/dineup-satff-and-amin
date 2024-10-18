import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const OrderConfirmationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl mb-6">Thank you for your order. It will be ready shortly.</p>
          <Button asChild>
            <Link to="/menu">
              Back to Menu
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;
