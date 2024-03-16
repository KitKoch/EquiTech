GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	CREATE PROC [dbo].[RelatedPersonalValues_SelectAll]
										

	AS

/*------------ TEST CODE ------------

EXECUTE [dbo].[RelatedPersonalValues_SelectAll]
									
*/

	BEGIN

			SELECT RPV.[PersonalValueA] AS IdA
					,PVA.Name
					,RPV.[PersonalValueB] AS IdB
					,PVB.Name

			FROM [dbo].[RelatedPersonalValues] AS RPV 
			INNER JOIN [dbo].[PersonalValues] AS PVA ON RPV.PersonalValueA = PVA.Id
			INNER JOIN [dbo].[PersonalValues] AS PVB ON RPV.PersonalValueB = PVB.Id
			ORDER BY PVA.Name, PVB.Name
   
	END


GO
