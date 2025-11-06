using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S2Retro.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRetroBoard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InstanceCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstanceCategories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Instances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsArchived = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    EntryPhaseStart = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EntryPhaseEnd = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Phase = table.Column<int>(type: "int", nullable: false),
                    BoardId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Instances_Boards_BoardId",
                        column: x => x.BoardId,
                        principalTable: "Boards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InstanceCategoryValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    InstanceCategoryId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstanceCategoryValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstanceCategoryValues_InstanceCategories_InstanceCategoryId",
                        column: x => x.InstanceCategoryId,
                        principalTable: "InstanceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InstanceColumns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Position = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    InstanceId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    InstanceCategoryId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstanceColumns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstanceColumns_InstanceCategories_InstanceCategoryId",
                        column: x => x.InstanceCategoryId,
                        principalTable: "InstanceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_InstanceColumns_Instances_InstanceId",
                        column: x => x.InstanceId,
                        principalTable: "Instances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InstanceRows",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Position = table.Column<int>(type: "int", nullable: false),
                    InstanceId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstanceRows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstanceRows_Instances_InstanceId",
                        column: x => x.InstanceId,
                        principalTable: "Instances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "InstanceCells",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Position = table.Column<int>(type: "int", nullable: false),
                    TextValue = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NumberValue = table.Column<double>(type: "double", nullable: true),
                    BoolValue = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    DateValue = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    RowId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    InstanceCategoryValueId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstanceCells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstanceCells_InstanceCategoryValues_InstanceCategoryValueId",
                        column: x => x.InstanceCategoryValueId,
                        principalTable: "InstanceCategoryValues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_InstanceCells_InstanceRows_RowId",
                        column: x => x.RowId,
                        principalTable: "InstanceRows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_InstanceCategoryValues_InstanceCategoryId",
                table: "InstanceCategoryValues",
                column: "InstanceCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_InstanceCells_InstanceCategoryValueId",
                table: "InstanceCells",
                column: "InstanceCategoryValueId");

            migrationBuilder.CreateIndex(
                name: "IX_InstanceCells_RowId",
                table: "InstanceCells",
                column: "RowId");

            migrationBuilder.CreateIndex(
                name: "IX_InstanceColumns_InstanceCategoryId",
                table: "InstanceColumns",
                column: "InstanceCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_InstanceColumns_InstanceId",
                table: "InstanceColumns",
                column: "InstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_InstanceRows_InstanceId",
                table: "InstanceRows",
                column: "InstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Instances_BoardId",
                table: "Instances",
                column: "BoardId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InstanceCells");

            migrationBuilder.DropTable(
                name: "InstanceColumns");

            migrationBuilder.DropTable(
                name: "InstanceCategoryValues");

            migrationBuilder.DropTable(
                name: "InstanceRows");

            migrationBuilder.DropTable(
                name: "InstanceCategories");

            migrationBuilder.DropTable(
                name: "Instances");

            migrationBuilder.DropTable(
                name: "Boards");
        }
    }
}
