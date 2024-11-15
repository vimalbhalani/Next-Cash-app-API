'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import useSocket from '@/lib/socket';

const { socket } = useSocket();
const userInfoStr = localStorage.getItem('userinfo')
const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};


export function UserAlarm() {
  const [messages, setMessages] = useState<string[]>([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to track if dropdown is open
  
  // Handle receiving messages
  useEffect(() => {
    const handleMessage = (content: string) => {
      setMessages((prev) => [...prev, content]);
      if (!dropdownOpen) { // Set badge to visible only if dropdown is closed
        setHasNewMessage(true);
      }
    };
    socket.emit('register', { userId: userInfo.userId, role: userInfo.role });
    socket.on('receiveMessage', handleMessage);

    // Clean up the event listener on component unmount
    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, [dropdownOpen]); // add dropdownOpen as dependency

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    // Clear the new message state only if the dropdown is opened
    if (!dropdownOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='relative text-2xl' handleClick={handleToggleDropdown}>
          &#128365;
          {hasNewMessage && (
            <span className="absolute bg-red-600 h-3 w-3 rounded-full -top-1 -right-[2.8px]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {messages.length === 0 ? (
              <p className="text-sm font-medium leading-none mt-2">No messages!</p>
            ) : (
              <ul>
                {messages
                  .slice()
                  .reverse()
                  .map((msg, index) => (
                    <li key={index}>
                      <p className="text-sm font-medium leading-none mt-2">{msg}</p>
                      <hr className="mt-2" />
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
