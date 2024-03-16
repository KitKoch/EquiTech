GO

CREATE TYPE [dbo].[BatchUserSkills] AS TABLE(
	[UserId] [int] NOT NULL,
	[SkillId] [int] NOT NULL,
	[ExperienceLevelId] [int] NOT NULL,
	[Years] [int] NOT NULL,
	[Months] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[SkillId] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
