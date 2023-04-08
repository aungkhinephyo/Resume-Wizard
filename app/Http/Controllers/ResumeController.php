<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResumeRequest;
use App\Http\Resources\ResumeListResource;
use App\Http\Resources\ResumeResource;
use App\Models\Resume;
use Illuminate\Http\Request;

class ResumeController extends Controller
{
    public function index(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        return ResumeListResource::collection(
            Resume::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(6)
        );
    }

    public function show(Request $request, Resume $resume)
    {
        /** @var User $user */
        $user = $request->user();
        if ($user->id !== $resume->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        return new ResumeResource($resume);
    }

    public function store(StoreResumeRequest $request)
    {
        $data = $request->validated();
        $resume = Resume::create([
            'title' => $data['title'],
            'user_id' => $data['user_id'],
            'personal_info' => json_encode($data['personal_info']),
            'social_links' => json_encode($data['social_links']),
            'education' => json_encode($data['education']),
            'experiences' => json_encode($data['experiences']),
            'skills' => json_encode($data['skills']),
            'languages' => json_encode($data['languages']),
            'projects' => json_encode($data['projects']),
        ]);
        return new ResumeResource($resume);
    }

    public function update(StoreResumeRequest $request, Resume $resume)
    {
        $data = $request->validated();
        $resume->update([
            'title' => $data['title'],
            'user_id' => $data['user_id'],
            'personal_info' => json_encode($data['personal_info']),
            'social_links' => json_encode($data['social_links']),
            'education' => json_encode($data['education']),
            'experiences' => json_encode($data['experiences']),
            'skills' => json_encode($data['skills']),
            'languages' => json_encode($data['languages']),
            'projects' => json_encode($data['projects']),
        ]);
        return new ResumeResource($resume);
    }

    public function destroy(Request $request, Resume $resume)
    {
        /** @var User $user */
        $user = $request->user();
        if ($user->id !== $resume->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        $resume->delete();
        return response('', 204);
    }
}
