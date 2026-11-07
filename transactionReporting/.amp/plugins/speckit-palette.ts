import type { PluginAPI } from '@ampcode/plugin'

export const description = 'Adds Speckit workflows to the Amp command palette.'

const commands = [
	{
		id: 'speckit.analyze',
		title: 'Analyze',
		description: 'Check a Speckit spec, plan, and tasks for consistency.',
		skill: 'speckit-analyzing-specifications',
	},
	{
		id: 'speckit.checklist',
		title: 'Checklist',
		description: 'Generate a requirements-quality checklist for the feature.',
		skill: 'speckit-generating-checklists',
	},
	{
		id: 'speckit.clarify',
		title: 'Clarify',
		description: 'Clarify underspecified areas in the current feature spec.',
		skill: 'speckit-clarifying-specifications',
	},
	{
		id: 'speckit.constitution',
		title: 'Constitution',
		description: 'Create or update the project constitution.',
		skill: 'speckit-defining-constitution',
	},
	{
		id: 'speckit.converge',
		title: 'Converge',
		description: 'Find unbuilt work and append it to the feature tasks.',
		skill: 'speckit-converging-implementation',
	},
	{
		id: 'speckit.implement',
		title: 'Implement',
		description: 'Implement the current feature tasks.',
		skill: 'speckit-implementing-plan',
	},
	{
		id: 'speckit.plan',
		title: 'Plan',
		description: 'Create an implementation plan for the feature spec.',
		skill: 'speckit-planning-implementation',
	},
	{
		id: 'speckit.specify',
		title: 'Specify',
		description: 'Create or update a feature specification.',
		skill: 'speckit-specifying-features',
	},
	{
		id: 'speckit.tasks',
		title: 'Tasks',
		description: 'Generate dependency-ordered implementation tasks.',
		skill: 'speckit-generating-tasks',
	},
] as const

export default function (amp: PluginAPI) {
	for (const command of commands) {
		amp.registerCommand(
			command.id,
			{
				title: command.title,
				category: 'Speckit',
				description: command.description,
			},
			async (ctx) => {
				if (!ctx.thread) {
					await ctx.ui.notify('Open a thread before starting a Speckit workflow.')
					return
				}

				const input = await ctx.ui.input({
					title: `Speckit: ${command.title}`,
					helpText: 'Optional context for this workflow.',
					submitButtonText: 'Run',
				})

				if (input === undefined) {
					return
				}

				await ctx.thread.appendUserMessage({
					type: 'user-message',
					content: `Use the ${command.skill} skill for this Speckit workflow.${input.trim() ? `\n\nContext: ${input.trim()}` : ''}`,
				})
			},
		)
	}
}
