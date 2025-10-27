'use client';
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import Lottie from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json';
import { CallStatus } from '@/types/vapi';
import useCompanion from '@/app/hooks/useCompanion';

const CompanionComponent = ({
  subject,
  name,
  topic,
  companionId,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const {
    messages,
    callStatus,
    isMuted,
    setIsMuted,
    setCallStatus,
    lottieRef,
  } = useCompanion(companionId);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleConnect = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistentOverrids = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ['transcript'],
      serverMessages: [],
    };
    // @ts-expect-error ignore
    vapi.start(configureAssistant(voice, style), assistentOverrids);
  };
  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };
  return (
    <section className="flex h-[70vh] flex-col">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                'absolute transition-opacity duration-1000',
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? 'opacity-100'
                  : 'opacity-0',
                callStatus === CallStatus.CONNECTING &&
                  'animate-pulse opacity-100',
              )}
            >
              <Image
                src={`/icons/${subject}.webp`}
                alt="subject"
                width={150}
                height={150}
                className="max-sm:w-fit"
                priority
              />
            </div>
            <div
              className={cn(
                'absolute transition-opacity duration-1000',
                callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoPlay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="text-2xl font-bold">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              priority
              className="rounded-lg"
            />
            <p className="text-2xl font-bold">{userName}</p>
          </div>
          <button
            className="btn-mic"
            disabled={callStatus !== CallStatus.ACTIVE}
            onClick={toggleMicrophone}
          >
            <Image
              src={isMuted ? '/icons/mic-off.webp' : '/icons/mic-on.webp'}
              className="dark:invert"
              alt="mic"
              width={36}
              priority
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? 'Turn on Microphone' : 'Turn off Microphone'}
            </p>
          </button>
          <button
            className={cn(
              'w-full cursor-pointer rounded-lg py-2 text-white transition-colors dark:text-black',
              callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary',
              callStatus === CallStatus.CONNECTING && 'animate-pulse',
            )}
            onClick={
              callStatus === CallStatus.ACTIVE
                ? handleDisconnect
                : handleConnect
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? 'End Session'
              : callStatus === CallStatus.CONNECTING
                ? 'Connecting'
                : 'Start Session'}
          </button>
        </div>
      </section>
      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message, i) => {
            if (message.role === 'assistant') {
              return (
                <p key={i} className="max-sm:text-sm">
                  {name.split(' ')[0].replace('/[.,]/g', '')}: {message.content}
                </p>
              );
            } else {
              return (
                <p key={i} className="text-primary max-sm:text-sm">
                  {userName}: {message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponent;
