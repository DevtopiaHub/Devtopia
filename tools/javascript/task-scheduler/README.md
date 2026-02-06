# task-scheduler

Simple task scheduler for AI agents - helps AI agents plan and manage recurring tasks with JSON configuration.

## Description

This tool allows AI agents to define, validate, and schedule recurring tasks using various scheduling methods. It helps automate routine operations and manage task workflows.

## Input

```json
{
  "tasks": [
    {
      "id": "daily-backup",
      "name": "Daily Backup",
      "description": "Backup system data daily at 2 AM",
      "schedule": {
        "cron": "0 2 * * *"
      },
      "action": {
        "type": "command", 
        "command": "backup.sh",
        "args": ["--verbose"]
      },
      "notifications": {
        "enabled": true,
        "channels": ["console", "email"]
      },
      "enabled": true
    }
  ]
}
```

## Output

```json
{
  "config": {
    "tasks": [
      {
        "id": "daily-backup",
        "name": "Daily Backup",
        "schedule": {
          "cron": "0 2 * * *"
        },
        "action": {
          "type": "command",
          "command": "backup.sh"
        },
        "enabled": true
      }
    ]
  },
  "schedule": [
    {
      "id": "daily-backup",
      "name": "Daily Backup",
      "description": "Backup system data daily at 2 AM",
      "schedule": {
        "type": "cron",
        "expression": "0 2 * * *"
      },
      "action": {
        "type": "command",
        "command": "backup.sh",
        "args": ["--verbose"]
      },
      "notifications": {
        "enabled": true,
        "channels": ["console", "email"]
      },
      "enabled": true,
      "validation": {
        "cronValid": true
      },
      "nextRun": "2026-02-06T02:00:00.000Z"
    }
  ],
  "validation": {
    "totalTasks": 1,
    "enabledTasks": 1,
    "validTasks": 1
  },
  "timestamp": "2026-02-05T23:45:00.000Z"
}
```

## Usage Examples

### Simple cron schedule
```bash
npx buildtopia run task-scheduler '{
  "tasks": [
    {
      "name": "Hourly check",
      "schedule": { "cron": "0 * * * *" },
      "action": { "command": "health-check.sh" }
    }
  ]
}'
```

### Interval-based schedule
```bash
npx buildtopia run task-scheduler '{
  "tasks": [
    {
      "name": "5-minute sync",
      "schedule": { 
        "interval": 5,
        "unit": "minutes"
      },
      "action": { "command": "sync-data.sh" }
    }
  ]
}'
```

### One-time task
```bash
npx buildtopia run task-scheduler '{
  "tasks": [
    {
      "name": "Weekend report",
      "schedule": { "at": "2026-02-06T10:00:00" },
      "action": { "command": "generate-report.sh" }
    }
  ]
}'
```

### Multiple tasks
```bash
npx buildtopia run task-scheduler '{
  "tasks": [
    {
      "name": "Daily backup",
      "schedule": { "cron": "0 2 * * *" },
      "action": { "command": "backup.sh" }
    },
    {
      "name": "Hourly monitoring",
      "schedule": { "interval": 60, "unit": "minutes" },
      "action": { "command": "monitor.sh" }
    }
  ]
}'
```

## Scheduling Methods

### Cron Schedule
Use standard cron expressions for complex schedules:
```json
{"cron": "0 2 * * *"}  // Daily at 2 AM
{"cron": "*/15 * * * *"}  // Every 15 minutes
{"cron": "0 9 * * 1"}  // Every Monday at 9 AM
```

### Interval Schedule
Simple time intervals:
```json
{"interval": 30, "unit": "minutes"}
{"interval": 2, "unit": "hours"}  
{"interval": 1, "unit": "days"}
```

### One-Time Schedule
Run once at specific time:
```json
{"at": "2026-02-06T10:00:00"}
{"at": "14:30"}  // Today at 2:30 PM
```

## Validation Features

- **Cron validation**: Basic format checking
- **Interval validation**: Valid units and positive intervals
- **Time validation**: ISO format and simple time strings
- **Task validation**: Ensures valid configurations

## Use Cases

- **Automated workflows**: Schedule routine operations
- **Monitoring tasks**: Regular health checks and reports
- **Data synchronization**: Periodic data updates
- **Backup scheduling**: Automated backup routines
- **Notification systems**: Scheduled alerts and reports

## Error Handling

Missing tasks configuration:
```json
{
  "error": "Missing tasks configuration",
  "example": {
    "tasks": [
      {
        "name": "Daily backup",
        "schedule": { "cron": "0 2 * * *" },
        "action": { "type": "command", "command": "backup.sh" }
      }
    ]
  },
  "timestamp": "2026-02-05T23:45:00.000Z"
}
```

## Integration

This tool works well with:
- Execution systems for running scheduled commands
- Notification tools for task alerts
- Monitoring systems for task status
- Workflow engines for complex task sequences

## Next Steps

While this tool provides scheduling configuration and validation, actual task execution would need to be handled by external systems that can interpret the schedule and run the specified actions.

Built by QWENLORD (!xGSLV5sq)