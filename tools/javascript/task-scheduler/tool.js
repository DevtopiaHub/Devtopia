#!/usr/bin/env node
/**
 * task-scheduler - Simple task scheduler for AI agents
 * Helps AI agents plan and manage recurring tasks with JSON configuration
 */

const input = JSON.parse(process.argv[2] || '{}');

function scheduleTasks(config) {
    const result = {
        config: config,
        schedule: [],
        validation: {},
        timestamp: new Date().toISOString()
    };
    
    // Validate tasks
    const errors = [];
    if (!config.tasks || !Array.isArray(config.tasks)) {
        result.error = 'Missing or invalid tasks array';
        return result;
    }
    
    // Process each task
    result.schedule = config.tasks.map((task, index) => {
        const scheduledTask = {
            id: task.id || `task-${index + 1}`,
            name: task.name || `Task ${index + 1}`,
            description: task.description || '',
            schedule: {},
            enabled: task.enabled !== false,
            validation: {}
        };
        
        // Parse schedule
        if (task.schedule) {
            if (task.schedule.cron) {
                scheduledTask.schedule.type = 'cron';
                scheduledTask.schedule.expression = task.schedule.cron;
                scheduledTask.validation.cronValid = validateCron(task.schedule.cron);
            } else if (task.schedule.interval) {
                scheduledTask.schedule.type = 'interval';
                scheduledTask.schedule.interval = task.schedule.interval;
                scheduledTask.schedule.unit = task.schedule.unit || 'minutes';
                scheduledTask.validation.intervalValid = validateInterval(task.schedule.interval, task.schedule.unit);
            } else if (task.schedule.at) {
                scheduledTask.schedule.type = 'once';
                scheduledTask.schedule.at = task.schedule.at;
                scheduledTask.validation.timeValid = validateTime(task.schedule.at);
            }
        }
        
        // Action configuration
        if (task.action) {
            scheduledTask.action = {
                type: task.action.type || 'command',
                command: task.action.command,
                args: task.action.args || []
            };
        }
        
        // Omnotations
        if (task.notifications) {
            scheduledTask.notifications = {
                enabled: task.notifications.enabled !== false,
                channels: task.notifications.channels || ['console']
            };
        }
        
        // Calculate next run time
        if (scheduledTask.enabled && scheduledTask.schedule.type) {
            scheduledTask.nextRun = calculateNextRun(scheduledTask.schedule);
        }
        
        return scheduledTask;
    });
    
    // Overall validation
    result.validation = {
        totalTasks: result.schedule.length,
        enabledTasks: result.schedule.filter(t => t.enabled).length,
        validTasks: result.schedule.filter(t => 
            t.enabled && 
            t.schedule.type && 
            Object.values(t.validation).every(v => v === true)
        ).length
    };
    
    return result;
}

function validateCron(cron) {
    // Simple cron validation - check basic format
    const parts = cron.split(' ');
    return parts.length >= 5 && parts.length <= 6;
}

function validateInterval(interval, unit) {
    const validUnits = ['seconds', 'minutes', 'hours', 'days'];
    return interval > 0 && validUnits.includes(unit);
}

function validateTime(time) {
    // Simple time validation (ISO format or HH:MM)
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}|\d{2}:\d{2}$/.test(time);
}

function calculateNextRun(schedule) {
    const now = new Date();
    
    if (schedule.type === 'once') {
        const runTime = new Date(schedule.at);
        return runTime > now ? runTime.toISOString() : null;
    }
    
    if (schedule.type === 'interval') {
        const intervalMs = schedule.interval * {
            seconds: 1000,
            minutes: 60000,
            hours: 3600000,
            days: 86400000
        }[schedule.unit];
        
        const nextRun = new Date(now.getTime() + intervalMs);
        return nextRun.toISOString();
    }
    
    // For cron, return a simple placeholder
    if (schedule.type === 'cron') {
        return 'Calculated based on cron expression';
    }
    
    return null;
}

// Validate input
if (!input.tasks) {
    console.log(JSON.stringify({
        error: 'Missing tasks configuration',
        example: {
            tasks: [
                {
                    name: "Daily backup",
                    schedule: { cron: "0 2 * * *" },
                    action: { type: "command", command: "backup.sh" }
                }
            ]
        },
        timestamp: new Date().toISOString()
    }));
    process.exit(1);
}

const result = scheduleTasks(input);
console.log(JSON.stringify(result));