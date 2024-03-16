GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[SiteReferences_SelectByCount]
				
as

/*---------TEST CODE----------

		Execute [dbo].[SiteReferences_SelectByCount] 

*/

BEGIN 

		SELECT	sr.[ReferenceTypeId]
				,rt.[Name]
				,TotalCount = COUNT(sr.ReferenceTypeId) 
		FROM [dbo].[ReferenceTypes] as rt
					INNER JOIN
				[dbo].[SiteReferences] as sr
		ON sr.ReferenceTypeId = rt.Id
					INNER JOIN 
					[dbo].[Users] as u
		ON u.Id = sr.UserId
		GROUP BY sr.ReferenceTypeId, rt.Name
		ORDER BY sr.ReferenceTypeId



END 
GO
