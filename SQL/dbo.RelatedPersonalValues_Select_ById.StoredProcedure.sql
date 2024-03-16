GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



			CREATE PROC [dbo].[RelatedPersonalValues_Select_ById]
											@Id int
											

			AS

/*------------ TEST CODE ------------

DECLARE @Id int = 6

EXECUTE [dbo].[RelatedPersonalValues_Select_ById]
									@Id

*/


			BEGIN

						SELECT RPV.[PersonalValueA] AS IdA
							  ,PVA.Name
							  ,RPV.[PersonalValueB] AS IdB
							  ,PVB.Name

							 
	  
						  FROM [dbo].[RelatedPersonalValues] AS RPV
						  INNER JOIN [dbo].PersonalValues AS PVA ON RPV.PersonalValueA = PVA.Id
						  INNER JOIN [dbo].PersonalValues AS PVB ON RPV.PersonalValueB = PVB.Id

						  WHERE RPV.PersonalValueA = @Id OR RPV.PersonalValueB = @Id
			END
GO
