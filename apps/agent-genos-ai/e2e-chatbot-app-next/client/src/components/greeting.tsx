import { motion } from 'framer-motion';


export const Greeting = () => {
  return (
    <div
      key="overview"
      className="mx-auto flex size-full max-w-3xl flex-col justify-center px-4 mb-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="text-center space-y-4"
      >
        
        
      <h1 className="text-3xl md:text-4xl font-semibold text-[#0F172A] dark:text-white">
        Welcome to{' '}
        <span className="text-[#0F172A] dark:text-white">Gen</span>
        <span className="bg-gradient-to-r from-[#0D9488] via-[#18B6C2] to-[#0D9488] bg-clip-text text-transparent">
        ö
        </span>
        <span className="text-[#0F172A] dark:text-white">s</span>
        {' '}
        <span className="text-[#0F172A] dark:text-white">AI</span>
      </h1>



        <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-7">
          Your intelligent financial portfolio assistant.
          Explore investments, assess portfolio risks, monitor
          client performance and support evidence-based
          capital allocation decisions.
        </p>

        <p className="text-sm text-muted-foreground">
          Ask a financial question to get started.
        </p>
      </motion.div>
    </div>
  );
};

