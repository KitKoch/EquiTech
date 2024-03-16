GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[AppointmentTypes_SelectAll]

as

/*

Execute [dbo].[AppointmentTypes_SelectAll]

*/

BEGIN

		SELECT [Id]
			  ,[Name]

		FROM [dbo].[AppointmentTypes]

END
GO
