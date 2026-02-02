
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';


export const CustomHeader = () => {





  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          {/* <CustomLogo /> */}
          COCOS


          {/* Search and Cart */}
          <div className="flex items-center space-x-4">


 

            <Link to="/auth/login">
              <Button variant="default" size="sm" className="ml-2">
                Login
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};