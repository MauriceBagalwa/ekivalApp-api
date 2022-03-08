"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.uploadImage = exports.checkDirectoryOrCreate = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
function checkDirectoryOrCreate(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_extra_1.default.ensureDir(path);
            return [true, ""];
        }
        catch (error) {
            console.log(error);
            return [false, "Une erreur est survenue lors de la verification du dossier"];
        }
    });
}
exports.checkDirectoryOrCreate = checkDirectoryOrCreate;
function uploadImage(folderName, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const folder = `public/uploads/${folderName}`;
        try {
            const [isCreated, error] = yield checkDirectoryOrCreate(folder);
            if (isCreated) {
                const destinationPath = `${folder}/ekival-${Date.now()}`;
                yield fs_extra_1.default.outputFile(destinationPath, file.buffer);
                let extArray = file.mimetype.split("/");
                let ext = extArray[extArray.length - 1];
                if (ext != "png" && ext != "jpg" && ext != "png")
                    return ["", "Format du fichier non pris en charge."];
                // let extension = extArray[extArray.length - 1];
                // console.log(file)
                // console.log("Extention:", extension)
                return [destinationPath, ""];
            }
            return ["", error];
        }
        catch (error) {
            console.log(error);
            return ["", "Une erreur est survenue lors du deplacement du fichier"];
        }
    });
}
exports.uploadImage = uploadImage;
function profile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const folder = `public/uploads/images`;
        try {
            const [isCreated, error] = yield checkDirectoryOrCreate(folder);
            if (isCreated) {
                let extArray = file.mimetype.split("/");
                let ext = extArray[extArray.length - 1];
                console.log("Name:", file.mimetype);
                if (ext != "png" && ext != "jpg" && ext != "png" && ext != 'jpeg')
                    return [false, "Format du fichier non pris en charge."];
                const destinationPath = `${folder}/ekvl${Date.now()}.${ext}`;
                yield fs_extra_1.default.outputFile(destinationPath, file.buffer);
                console.log("designation:", destinationPath);
                return [true, `${destinationPath.replace(`public/`, "")}`];
            }
            return [false, error];
        }
        catch (error) {
            console.log(error);
            return [false, "Une erreur est survenue lors du deplacement du fichier"];
        }
    });
}
exports.profile = profile;
