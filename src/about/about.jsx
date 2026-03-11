import React from 'react';
import './about.css';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  React.useEffect(() => {
    setImageUrl('mlb-logo.jpg');
    setQuote('Show me the code');
    setQuoteAuthor('Linus Torvalds');
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center" id="about-content">
      <div className="picture-box">
        {imageUrl && (
          <img src={imageUrl} alt="About placeholder" className="img-fluid" />
        )}
      </div>

      <div className="quote-box bg-light text-dark">
        <p className="quote">{quote}</p>
        <p className="author">- {quoteAuthor}</p>
      </div>

      <article>
            <h2>About Smart Weekly Scheduler</h2>
            <p>
                Smart Weekly Scheduler is an intelligent task management and scheduling 
                application that helps you organize your week effectively.
            </p>

            <section>
                <h3>Features</h3>
                <ul>
                    <li>Add tasks with categories (Homework, Work, Personal, Exercise, Errands, Social, Commute), estimated hours, and priorities</li>
                    <li>Automatic schedule generation with multiple algorithm strategies</li>
                    <li>Visual weekly calendar view with 24-hour time slots</li>
                    <li>Real-time collaboration and activity feed via WebSocket</li>
                    <li>Customizable work hours, break times, and buffer periods</li>
                    <li>Chronotype-aware scheduling (morning person, night owl, or afternoon peak)</li>
                    <li>Configurable task defaults for faster task entry</li>
                    <li>Multiple scheduling strategies to match your workflow</li>
                </ul>
            </section>

            <section>
                <h3>Technologies Used</h3>
                <ul>
                    <li><strong>Frontend:</strong> HTML, CSS, JavaScript (React)</li>
                    <li><strong>Backend:</strong> Node.js, Express</li>
                    <li><strong>Database:</strong> MongoDB</li>
                    <li><strong>Real-time:</strong> WebSocket</li>
                    <li><strong>Authentication:</strong> JWT</li>
                </ul>
            </section>

            <section>
                <h3>Developer</h3>
                <p>Created by Adam Ross for CS 260 - Web Programming</p>
            </section>

            <section>
                <h3>How It Works</h3>
                <p>
                    The Smart Weekly Scheduler uses an intelligent algorithm to automatically 
                    arrange your tasks throughout the week based on:
                </p>
                <ul>
                    <li><b>Scheduling Strategy:</b> Choose between priority-first, earliest deadline first, balanced, or shortest task first</li>
                    <li><b>Priority levels:</b> High-priority tasks can be scheduled first based on your strategy</li>
                    <li><b>Due dates:</b> Tasks due soon are prioritized when using deadline-first strategy</li>
                    <li><b>Time estimates:</b> Tasks are allocated appropriate time blocks with buffer time between tasks</li>
                    <li><b>Chronotype:</b> Respects your energy levels - schedule harder tasks in the morning, evening, or afternoon based on when you work best</li>
                    <li><b>Work preferences:</b> Work hours, break times, and buffer periods are respected</li>
                    <li><b>Task defaults:</b> New tasks automatically use your preferred category, priority, and duration settings</li>
                </ul>
                <p>
                    You can also manually adjust the schedule by editing tasks or regenerating 
                    the entire schedule with new constraints. All settings can be customized in the Settings menu.
                </p>
            </section>

            <section>
                <h3>Real-Time Collaboration</h3>
                <p>
                    The Live Activity feed uses WebSocket technology to show you what other users are doing in real-time. 
                    See when other users schedule tasks, complete work, or make changes to their schedules.
                </p>
            </section>
        </article>
    </main>
  );
}
