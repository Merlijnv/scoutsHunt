using System;
using Microsoft.Extensions.Logging;

namespace scoutsHunt
{
    public class HuntLogger : ILogger
    { 
        private readonly LogLevel _level;

        public HuntLogger(LogLevel level)
        {
            _level = level;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return logLevel == _level;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
            {
                return;
            }
            
            Console.WriteLine($"[{logLevel.ToString()}] {formatter(state, exception)}");
            //write to file

        }
    }
}